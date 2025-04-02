"use client";

import { Input } from "@heroui/input";
import React, { useCallback, useRef, useState } from "react";
import { AiTwotoneCloseCircle } from "react-icons/ai";
import { MdOutlineCloudUpload } from "react-icons/md";
import Image from "next/image";

interface FileInputProps {
  onChange?: (files: File[]) => void;
  maxSize?: number; // in bytes (1MB = 1_000_000 bytes)
  allowedTypes?: string[];
  name: string;
}

const FileInput: React.FC<FileInputProps> = ({
                                               onChange,
                                               maxSize = 1000000, // 1MB
                                               allowedTypes = ["image/jpeg", "image/png", "image/jpg"],
                                               name
                                             }: FileInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const validFiles: File[] = [];
    const errors: string[] = [];

    Array.from(newFiles).forEach((file) => {
      if (!allowedTypes.includes(file.type)) {
        errors.push(`Unsupported format: ${file.name}`);
      } else if (file.size > maxSize) {
        errors.push(`File too large: ${file.name}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    if (validFiles.length > 0) {
      setFiles(validFiles);
      onChange?.(validFiles);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      handleChange(e.dataTransfer.files);
    },
    [handleChange]
  );

  const removeFile = (index: number) => {
    const newFiles = [...files];

    newFiles.splice(index, 1);
    setFiles(newFiles ?? undefined);
    onChange?.(newFiles ?? undefined);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1_000_000) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / 1_048_576).toFixed()} MB`;
  };

  return (
    <div className="space-y-4 w-full">
      <div
        className={`border-2 border-dashed rounded-lg bg-white p-6 text-center transition-colors w-full ${
          dragActive ? "border-blue-500 bg-slate-200" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <MdOutlineCloudUpload className="w-8 h-8 text-purple-500" />
          <span className="flex gap-2 justify-center items-center">
            <p className="font-medium text-[#0B0B0B]">Drag your file or </p>
            <button
              type="button"
              className=" text-purple-500 font-medium cursor-pointer self-end"
              onClick={() => inputRef.current?.click()}
            >
              browse
            </button>
          </span>
          <p className="text-sm text-gray-500">
            Max {formatFileSize(maxSize)} files are allowed
          </p>

          <Input
            ref={inputRef}
            accept={allowedTypes.join(",")}
            className="hidden"
            defaultValue={undefined}
            name={name}
            type="file"
            onChange={(e) => handleChange(e.target.files)}
          />
        </div>
      </div>
      <p className="text-sm text-[#FFFFFF]">
        Only supports {allowedTypes.map((t) => t.split("/")[1]).join(", ")}
      </p>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border bg-white rounded-2xl "
            >
              <div className="flex items-center space-x-3">
                {file.type.startsWith("image/") && (
                  <Image
                    width={100}
                    height={100}
                    alt="Preview"
                    className="!w-17 h-10 object-cover rounded"
                    src={URL.createObjectURL(file)}
                  />
                )}
                <div>
                  <p className="font-sm text-[#0B0B0B]">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="text-gray-500 hover:text-red-500"
                type="button"
                onClick={() => removeFile(index)}
              >
                <AiTwotoneCloseCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileInput;
