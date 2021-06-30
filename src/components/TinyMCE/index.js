import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TinyMCE({content, setContent}) {

  return (
    <Editor
      apiKey='a8nvofgkqgto9gjkd2366ozmmji73zcn3qs67svo52x8z984'
      init={{
        height: 300,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar: 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      value={content}
      onEditorChange={(newValue, editor) => {setContent(newValue)}}
    />
  );
}


/*
export default function TinyMCE() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
    
      <Editor
        apiKey='a8nvofgkqgto9gjkd2366ozmmji73zcn3qs67svo52x8z984'

        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>Add content !</p>"
        init={{
          height: 300,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
*/