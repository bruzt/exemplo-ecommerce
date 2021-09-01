import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import AddImageInput from "./";
import { ThemeContextProvider } from "../../../contexts/ThemeContext";

describe("Add Image Input Component Tests", () => {
  it("should select file", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    let getFiles: File[] = [];
    function setFiles(files: File[]) {
      getFiles = files;
    }

    const { getByTestId } = render(
      <ThemeContextProvider>
        <AddImageInput getFiles={getFiles} setFiles={setFiles} />
      </ThemeContextProvider>
    );

    const filesInput = getByTestId("files-input") as HTMLInputElement;

    fireEvent.change(filesInput, { target: { files: [file] } });

    expect(filesInput.files[0].name).toBe("chucknorris.png");
    expect(filesInput.files.length).toBe(1);
  });

  it("should add file name bellow input", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    let getFiles: File[] = [file];
    function setFiles(files: File[]) {
      getFiles = files;
    }

    const { getByTestId } = render(
      <ThemeContextProvider>
        <AddImageInput getFiles={getFiles} setFiles={setFiles} />
      </ThemeContextProvider>
    );

    const fileNameSpan = getByTestId("file-name-span");

    expect(fileNameSpan.innerHTML).toBe("chucknorris.png");
  });

  it("should remove file from array", async () => {
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    let getFiles: File[] = [file];
    function setFiles(files: File[]) {
      getFiles = files;
    }

    const { getByTestId } = render(
      <ThemeContextProvider>
        <AddImageInput getFiles={getFiles} setFiles={setFiles} />
      </ThemeContextProvider>
    );

    const removeFileButton = getByTestId("remove-file-button");

    fireEvent.click(removeFileButton);

    expect(getFiles.length).toBe(0);
  });
});
