"use client";

import { TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

export default function DynamicField({ field, register, errors, watch }) {
  const name = field.name.replace(/\s+/g, "").toLowerCase(); // e.g "Full Name" → "fullname"

  if (field.fieldType === "TEXT") {
    return (
      <TextField
        fullWidth
        label={field.name}
        defaultValue={field.defaultValue}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        {...register(name, {
          required: field.required && `${field.name} is required`,
          minLength: field.minLength && {
            value: field.minLength,
            message: `Minimum ${field.minLength} characters`,
          },
          maxLength: field.maxLength && {
            value: field.maxLength,
            message: `Maximum ${field.maxLength} characters`,
          },
        })}
      />
    );
  }

  if (field.fieldType === "LIST") {
    return (
      <FormControl fullWidth>
        <InputLabel>{field.name}</InputLabel>
        <Select
          defaultValue={field.defaultValue || ""}
          label={field.name}
          {...register(name, { required: field.required })}
        >
          {field.listOfValues1.map((opt, idx) => (
            <MenuItem key={idx} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  if (field.fieldType === "RADIO") {
    return (
      <FormControl>
        <InputLabel shrink>{field.name}</InputLabel>
        <RadioGroup defaultValue={field.defaultValue}>
          {field.listOfValues1.map((opt, idx) => (
            <FormControlLabel
              key={idx}
              value={opt}
              control={<Radio />}
              label={opt}
              {...register(name, { required: field.required })}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  return null;
}
