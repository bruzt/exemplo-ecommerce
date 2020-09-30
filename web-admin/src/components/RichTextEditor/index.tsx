import React, { HTMLAttributes } from 'react';
import dynamic from 'next/dynamic';
import SunEditor from 'suneditor-react';
import dompurify from 'dompurify';

import 'suneditor/dist/css/suneditor.min.css';

import sunEditorLangPtBr from '../../utils/sunEditorLangPtBr';

import { Container } from './styles';

interface IProps extends HTMLAttributes<HTMLElement> {
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

function RichTextEditor({ setContent, ...rest }: IProps) {

    function onEditorChange(content: string){

        setContent(dompurify.sanitize(content, { 
            ADD_TAGS: ["iframe"], 
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] 
        }));
    }

    return (
        <Container {...rest}>
           
            <SunEditor
                lang={sunEditorLangPtBr}
                setDefaultStyle={`
                    width: 100%;
                    max-width: 800px;
                    height: 100%;
                    min-height: 500px;
                `}
                placeholder='Escreva aqui'
                onChange={onEditorChange}
                setOptions={{
                    imageWidth: '100%',
                    imageFileInput: false,
                    formats: ['h1', 'h2', 'p'],
                    buttonList: [
                        ['undo', 'redo'],
                        ['formatBlock', 'align', 'list'],
                        ['bold', 'underline', 'italic', 'strike', 'removeFormat'],
                        ['image', 'link', 'video'],
                    ],
                }}
            />

        </Container>
    );
}

export default dynamic(Promise.resolve(RichTextEditor), { ssr: false });
