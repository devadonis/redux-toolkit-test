import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Button, Card } from "reactstrap";
import { PUBLIC_API_URL } from "@src/config";
import { encode, decode } from "html-entities";
import { PacmanLoader } from "react-spinners";
import { Center } from "@chakra-ui/react";
import BackButtonTitle from "@src/views/BackButtonTitle";
import toast from "react-hot-toast";

const TinyMCEEditor = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [editorLoaded, setEditorLoaded] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${PUBLIC_API_URL}/api/reports/contractTemplate`
        );
        setContent(String(decode(data.data)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${PUBLIC_API_URL}/api/reports/contractTemplate`,
        {
          contractTemplate: encode(content),
        }
      );
      toast.success("Contract Template Updated");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {loading && editorLoaded ? (
        <Center>
          <PacmanLoader color="#36d7b7" />
        </Center>
      ) : (
        <>
          <BackButtonTitle title="Edit Contract Template" />

          <Editor
            apiKey="atg8vm8gu6jvj28oyysi3c7ykf4sax4j7ef260tu4bwzdkou"
            onInit={(editor) => {
              editorRef.current = editor;
              setEditorLoaded(true);
            }}
            onEditorChange={handleEditorChange}
            value={content}
            init={{
              height: "85vh",
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
                "imagetools",
                "table",
                "textcolor",
                "hr",
                "contextmenu",
                "emoticons",
                "template",
                "code",
                "fullscreen",
                "wordcount",
                "media",
                "preview",
                "codesample",
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline strikethrough forecolor backcolor | " +
                "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
                "blockquote subscript superscript | link unlink | image media | codesample code |" +
                "hr removeformat | table | charmap emoticons | fullscreen preview",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <Card>
            <Button onClick={handleSave}>Save</Button>
          </Card>
        </>
      )}
    </>
  );
};

export default TinyMCEEditor;
