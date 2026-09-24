"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  normalizeLicensePlate,
  sellCarSchema,
  type RdwVehicle,
  type SellCarInput,
} from "@/lib/forms/sell-car-schema";
import {
  sellCarFileAccept,
  sellCarFileLimits,
  validateSellCarFiles,
} from "@/lib/forms/sell-car-files";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/field";

type PhotoItem = {
  id: string;
  file: File;
  preview: string | null;
};

const emptyValues: SellCarInput = {
  licensePlate: "",
  mileage: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  make: "",
  model: "",
  year: "",
  fuel: "",
  privacy: false,
  company: "",
};

function vehicleLabel(vehicle: RdwVehicle): string {
  return [vehicle.make, vehicle.model].filter(Boolean).join(" ");
}

export function SellCarForm() {
  const [lookup, setLookup] = React.useState<
    "idle" | "loading" | "found" | "missing" | "error"
  >("idle");
  const [vehicle, setVehicle] = React.useState<RdwVehicle | null>(null);
  const [photos, setPhotos] = React.useState<PhotoItem[]>([]);
  const [photoError, setPhotoError] = React.useState<string | null>(null);
  const requestId = React.useRef(0);
  const photosRef = React.useRef(photos);
  photosRef.current = photos;

  React.useEffect(() => {
    return () => {
      for (const photo of photosRef.current) {
        if (photo.preview) URL.revokeObjectURL(photo.preview);
      }
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SellCarInput>({
    resolver: zodResolver(sellCarSchema),
    defaultValues: emptyValues,
  });

  const lookupPlate = React.useCallback(
    async (raw: string) => {
      const kenteken = normalizeLicensePlate(raw);
      if (
        kenteken.length < 5 ||
        kenteken.length > 8 ||
        !/[A-Z]/.test(kenteken) ||
        !/\d/.test(kenteken)
      ) {
        setVehicle(null);
        setLookup("idle");
        setValue("make", "");
        setValue("model", "");
        setValue("year", "");
        setValue("fuel", "");
        return;
      }

      const current = ++requestId.current;
      setLookup("loading");

      try {
        const response = await fetch(
          `/api/kenteken?kenteken=${encodeURIComponent(kenteken)}`,
        );
        const data = (await response.json()) as {
          ok?: boolean;
          found?: boolean;
          vehicle?: RdwVehicle;
        };

        if (current !== requestId.current) return;

        if (!response.ok || !data.ok) {
          setVehicle(null);
          setLookup("error");
          return;
        }

        if (!data.found || !data.vehicle) {
          setVehicle(null);
          setLookup("missing");
          setValue("make", "");
          setValue("model", "");
          setValue("year", "");
          setValue("fuel", "");
          return;
        }

        setVehicle(data.vehicle);
        setLookup("found");
        setValue("make", data.vehicle.make);
        setValue("model", data.vehicle.model);
        setValue("year", data.vehicle.year);
        setValue("fuel", data.vehicle.fuel);
      } catch {
        if (current !== requestId.current) return;
        setVehicle(null);
        setLookup("error");
      }
    },
    [setValue],
  );

  function clearPhotos() {
    setPhotos((current) => {
      for (const photo of current) {
        if (photo.preview) URL.revokeObjectURL(photo.preview);
      }
      return [];
    });
    setPhotoError(null);
  }

  function addPhotos(incoming: File[]) {
    if (incoming.length === 0) return;

    const next = [...photos];
    let error: string | null = null;

    for (const file of incoming) {
      const issue = validateSellCarFiles([
        ...next.map((item) => item.file),
        file,
      ]);
      if (issue) {
        error = issue;
        continue;
      }

      next.push({
        id: crypto.randomUUID(),
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      });
    }

    setPhotoError(error);
    setPhotos(next);
  }

  function removePhoto(id: string) {
    const target = photos.find((photo) => photo.id === id);
    if (target?.preview) URL.revokeObjectURL(target.preview);
    const next = photos.filter((photo) => photo.id !== id);
    setPhotoError(validateSellCarFiles(next.map((photo) => photo.file)));
    setPhotos(next);
  }

  const onSubmit = handleSubmit(async (values) => {
    const fileError = validateSellCarFiles(photos.map((photo) => photo.file));
    if (fileError) {
      setPhotoError(fileError);
      return;
    }

    const body = new FormData();
    for (const [key, value] of Object.entries(values)) {
      body.append(key, String(value ?? ""));
    }
    for (const photo of photos) {
      body.append("photos", photo.file);
    }

    try {
      const response = await fetch("/api/auto-verkopen", {
        method: "POST",
        body,
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        toast.error(data.error ?? "Versturen mislukt. Probeer het opnieuw.");
        return;
      }

      toast.success(
        data.message ??
          "Bedankt. We nemen zo snel mogelijk contact op met een vrijblijvend bod.",
      );
      reset(emptyValues);
      clearPhotos();
      setVehicle(null);
      setLookup("idle");
    } catch {
      toast.error(
        "Er ging iets mis. Controleer uw verbinding en probeer opnieuw.",
      );
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="sell-plate"
          label="Kenteken"
          required
          error={errors.licensePlate?.message}
          hint="Bijv. AB-123-C"
        >
          <Input
            autoCapitalize="characters"
            autoComplete="off"
            placeholder="AB-123-C"
            {...register("licensePlate", {
              onBlur: (event) => {
                void lookupPlate(event.target.value);
              },
            })}
          />
        </Field>

        <Field
          id="sell-mileage"
          label="Kilometerstand"
          required
          error={errors.mileage?.message}
          hint="Alleen het getal, bijv. 145000"
        >
          <Input
            inputMode="numeric"
            autoComplete="off"
            placeholder="145000"
            {...register("mileage")}
          />
        </Field>
      </div>

      {lookup === "loading" ? (
        <p className="text-sm text-muted" role="status">
          Kenteken opzoeken…
        </p>
      ) : null}

      {lookup === "found" && vehicle ? (
        <div className="border border-line bg-paper px-4 py-3 text-sm text-ink">
          <p className="font-semibold">{vehicleLabel(vehicle)}</p>
          <p className="mt-1 text-muted">
            {[vehicle.year, vehicle.fuel, vehicle.color]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      ) : null}

      {lookup === "missing" ? (
        <p className="text-sm text-muted" role="status">
          Dit kenteken staat niet in de RDW-gegevens. U kunt het formulier
          gewoon versturen.
        </p>
      ) : null}

      {lookup === "error" ? (
        <p className="text-sm text-muted" role="status">
          Kentekencontrole lukt nu niet. Uw aanvraag kunnen we wel ontvangen.
        </p>
      ) : null}

      <Field id="sell-name" label="Naam" required error={errors.name?.message}>
        <Input autoComplete="name" placeholder="Uw naam" {...register("name")} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="sell-email"
          label="E-mailadres"
          required
          error={errors.email?.message}
        >
          <Input
            type="email"
            autoComplete="email"
            placeholder="naam@voorbeeld.nl"
            {...register("email")}
          />
        </Field>

        <Field
          id="sell-phone"
          label="Telefoonnummer"
          required
          error={errors.phone?.message}
        >
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="06 1234 5678"
            {...register("phone")}
          />
        </Field>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-ink">
          Foto&apos;s of bestanden
        </p>
        <label
          htmlFor="sell-photos"
          className="flex cursor-pointer flex-col items-center justify-center gap-1 border border-dashed border-line bg-paper px-4 py-8 text-center transition-colors hover:border-ink/30"
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDrop={(event) => {
            event.preventDefault();
            addPhotos(Array.from(event.dataTransfer.files));
          }}
        >
          <span className="text-sm font-semibold text-ink">
            Sleep foto&apos;s hierheen, of klik om te kiezen
          </span>
          <span className="text-sm text-muted">
            JPG, PNG, WEBP, HEIC of PDF. Maximaal {sellCarFileLimits.maxCount}{" "}
            bestanden, 10 MB per stuk.
          </span>
          <input
            id="sell-photos"
            type="file"
            multiple
            accept={sellCarFileAccept}
            className="sr-only"
            onChange={(event) => {
              addPhotos(Array.from(event.target.files ?? []));
              event.target.value = "";
            }}
          />
        </label>
        {photoError ? (
          <p className="text-sm text-accent" role="alert">
            {photoError}
          </p>
        ) : (
          <p className="text-sm text-muted">
            Optioneel. Foto&apos;s van schade, interieur of de buitenkant geven
            een beter beeld van de staat.
          </p>
        )}
        {photos.length > 0 ? (
          <ul className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {photos.map((photo) => (
              <li key={photo.id} className="border border-line bg-paper">
                {photo.preview ? (
                  // Blob previews are local and short-lived; next/image cannot load them.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo.preview}
                    alt=""
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center px-2 text-center text-xs font-semibold tracking-wide text-muted uppercase">
                    PDF
                  </div>
                )}
                <div className="flex items-center gap-2 border-t border-line px-2 py-2">
                  <p className="min-w-0 flex-1 truncate text-xs text-ink">
                    {photo.file.name}
                  </p>
                  <button
                    type="button"
                    className="shrink-0 text-xs font-semibold text-ink underline-offset-2 hover:underline"
                    aria-label={`Verwijder ${photo.file.name}`}
                    onClick={() => removePhoto(photo.id)}
                  >
                    Verwijder
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <Field
        id="sell-message"
        label="Extra informatie"
        error={errors.message?.message}
        hint="Optioneel: schade, onderhoud, opties of wanneer de auto opgehaald mag worden"
      >
        <Textarea
          rows={4}
          placeholder="Bijv. lichte schade aan de bumper, onderhoud is bij"
          {...register("message")}
        />
      </Field>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="sell-company">Laat dit veld leeg</label>
        <input
          id="sell-company"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <input type="hidden" {...register("make")} />
      <input type="hidden" {...register("model")} />
      <input type="hidden" {...register("year")} />
      <input type="hidden" {...register("fuel")} />

      <div className="space-y-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 border border-line accent-accent"
            {...register("privacy")}
          />
          <span>
            Ik ga akkoord met de{" "}
            <Link
              href="/privacy"
              className="font-semibold text-ink underline-offset-2 hover:underline"
            >
              privacyverklaring
            </Link>
            .
          </span>
        </label>
        {errors.privacy?.message ? (
          <p className="text-sm text-accent" role="alert">
            {errors.privacy.message}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Versturen…" : "Vrijblijvend bod aanvragen"}
      </Button>
    </form>
  );
}
