import React, { HTMLAttributes } from 'react';
import dynamic from 'next/dynamic';
import SunEditor from 'suneditor-react';
import dompurify from 'dompurify';

import 'suneditor/dist/css/suneditor.min.css';

//import sunEditorLangPtBr from '../../utils/sunEditorLangPtBr';

import { Container } from './styles';

interface IProps extends HTMLAttributes<HTMLElement> {
    getContent: string;
    setContent: React.Dispatch<React.SetStateAction<string>>;
}

let timeoutId: NodeJS.Timeout;

function RichTextEditor({ getContent, setContent, ...rest }: IProps) {

    function setContentTimeOut(content: string){

        clearTimeout(timeoutId);

        timeoutId = setTimeout( () => {
            onEditorChange(content)
        }, 1000);
    }

    function onEditorChange(content: string) {

        content = content.replace('height: 56.25%; padding-bottom: 56.25%;', 'height: 394px; padding-bottom: 0px;');

        const purifiedContent = dompurify.sanitize(content, { 
            ADD_TAGS: ["iframe"], 
            ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] 
        });

        setContent(purifiedContent);
    }

    return (
        <Container {...rest}>
           
            <SunEditor
                lang="pt_br" /*sunEditorLangPtBr*/
                setDefaultStyle={`
                    width: 100%;
                    max-width: 800px;
                    height: 100%;
                    min-height: 500px;
                `}
                placeholder='Escreva aqui'
                setContents={getContent}
                onChange={(content) => setContentTimeOut(content)}
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
