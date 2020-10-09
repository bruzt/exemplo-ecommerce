import React, { FormEvent } from 'react';

import { Container } from './styles';

interface IProps {
    getFiles: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function AddImageInput({ getFiles, setFiles }: IProps) {

    let inputElement: HTMLInputElement;

    function handleFilesInput(event: FormEvent<HTMLInputElement>) {

        const files = Array.from(event.currentTarget.files);

        if (files.length > 0) {

            const concatFiles = [...getFiles, ...files];

            const uniqueFiles = concatFiles.map( (file) => file['name'])
                .map( (name, index, final) => final.indexOf(name) === index && index)
                .filter( (index) => concatFiles[index])
                .map( (file) => concatFiles[file])
            ;

            setFiles(uniqueFiles);
        }
    }

    function handleRemoveFile(name: string) {

        const files = getFiles.filter((file) => file.name != name);

        setFiles(files);
    }

    return (
        <Container>
            
            <div className="input-group">
                    <label htmlFor="file-input">Adicionar Imagens</label>
                    <button type='button' id='file-input' onClick={() => inputElement.click()}>
                        Selecione as imagens
                    </button>
                    <input
                        ref={(element) => inputElement = element}
                        type='file'
                        accept="image/png,image/gif,image/jpeg"
                        multiple
                        onChange={handleFilesInput}
                    />
                    {getFiles.length > 0 && <br />}
                    {getFiles.map((file, index) => (
                        <p key={index}>
                            {file.name}
                            <button
                                type='button'
                                className='remove-file'
                                onClick={() => handleRemoveFile(file.name)}
                            >
                                X
                            </button>
                        </p>
                    ))}
                </div>

        </Container>
    );
}
