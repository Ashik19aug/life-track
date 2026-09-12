"use client";
import { FormEvent, useState } from "react";

type Profile = {
  firstName: string;
  lastName: string;
  displayName: string | null;
  dateOfBirth: Date | string | null;
  gender: string | null;
  bio: string | null;
};
type Preferences = {
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  weekStartsOn: string;
  weightUnit: string;
  heightUnit: string;
  distanceUnit: string;
  temperatureUnit: string;
  theme: string;
  language: string;
};
function Message({ message }: { message: string | null }) {
  return message ? (
    <p role="status" className="mt-3 text-sm text-emerald-700">
      {message}
    </p>
  ) : null;
}
async function save(url: string, body: object) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error?.message ?? "Unable to save changes.");
  return payload;
}
export function ProfileForm({ profile }: { profile: Profile }) {
  const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    try {
      await save("/api/profile", Object.fromEntries(new FormData(event.currentTarget)));
      setMessage("Profile updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save changes.");
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="First name" name="firstName" defaultValue={profile.firstName} />
        <Input label="Last name" name="lastName" defaultValue={profile.lastName} />
      </div>
      <Input
        label="Display name"
        name="displayName"
        defaultValue={profile.displayName ?? ""}
        required={false}
      />
      <Input
        label="Date of birth"
        name="dateOfBirth"
        type="date"
        defaultValue={profile.dateOfBirth ? String(profile.dateOfBirth).slice(0, 10) : ""}
        required={false}
      />
      <label className="block text-sm font-medium">
        Gender
        <select
          name="gender"
          defaultValue={profile.gender ?? ""}
          className="mt-1 w-full rounded-lg border p-2"
        >
          <option value="">Not specified</option>
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
          <option value="NON_BINARY">Non-binary</option>
          <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
          <option value="SELF_DESCRIBE">Self describe</option>
        </select>
      </label>
      <label className="block text-sm font-medium">
        Bio
        <textarea
          name="bio"
          maxLength={500}
          defaultValue={profile.bio ?? ""}
          className="mt-1 w-full rounded-lg border p-2"
        />
      </label>
      <button className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white">
        Save profile
      </button>
      <Message message={message} />
    </form>
  );
}
export function PreferencesForm({ preferences }: { preferences: Preferences }) {
  const [message, setMessage] = useState<string | null>(null);
  const zones = Intl.supportedValuesOf("timeZone");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    try {
      await save("/api/profile/preferences", Object.fromEntries(new FormData(event.currentTarget)));
      setMessage("Preferences updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save changes.");
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border bg-white p-6">
      <label className="block text-sm font-medium">
        Timezone
        <select
          name="timezone"
          defaultValue={preferences.timezone}
          className="mt-1 w-full rounded-lg border p-2"
        >
          {zones.map((zone) => (
            <option key={zone}>{zone}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          name="weightUnit"
          label="Weight unit"
          value={preferences.weightUnit}
          options={["KG", "LB"]}
        />
        <Select
          name="heightUnit"
          label="Height unit"
          value={preferences.heightUnit}
          options={["CM", "FT_IN"]}
        />
        <Select
          name="distanceUnit"
          label="Distance unit"
          value={preferences.distanceUnit}
          options={["KM", "MI"]}
        />
        <Select
          name="temperatureUnit"
          label="Temperature unit"
          value={preferences.temperatureUnit}
          options={["CELSIUS", "FAHRENHEIT"]}
        />
        <Select
          name="dateFormat"
          label="Date format"
          value={preferences.dateFormat}
          options={["YYYY_MM_DD", "DD_MM_YYYY", "MM_DD_YYYY"]}
        />
        <Select
          name="timeFormat"
          label="Time format"
          value={preferences.timeFormat}
          options={["HOUR_24", "HOUR_12"]}
        />
        <Select
          name="weekStartsOn"
          label="Week starts on"
          value={preferences.weekStartsOn}
          options={["MONDAY", "SUNDAY"]}
        />
        <Select
          name="theme"
          label="Theme"
          value={preferences.theme}
          options={["SYSTEM", "LIGHT", "DARK"]}
        />
      </div>
      <Input label="Language" name="language" defaultValue={preferences.language} />
      <button className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white">
        Save preferences
      </button>
      <Message message={message} />
    </form>
  );
}
export function PasswordForm() {
  const [message, setMessage] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    try {
      await save(
        "/api/profile/security/password",
        Object.fromEntries(new FormData(event.currentTarget)),
      );
      event.currentTarget.reset();
      setMessage("Password changed successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save changes.");
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border bg-white p-6">
      <Input label="Current password" name="currentPassword" type="password" />
      <Input label="New password" name="newPassword" type="password" />
      <Input label="Confirm new password" name="confirmNewPassword" type="password" />
      <button className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white">
        Change password
      </button>
      <Message message={message} />
    </form>
  );
}
function Input({
  label,
  name,
  type = "text",
  defaultValue,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full rounded-lg border p-2"
      />
    </label>
  );
}
function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: string[];
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <select name={name} defaultValue={value} className="mt-1 w-full rounded-lg border p-2">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
