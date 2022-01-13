import ProgressBar from "react-bootstrap/ProgressBar";

const UploadAlbumDropzone = ({ params }) => {
  return (
    <>
      <div
        {...params.getRootProps()}
        id="image-dropzone"
        className="text-center"
      >
        <input {...params.getInputProps()} />

        {params.isDragActive ? (
          params.isDragAccept ? (
            <p>Drop it like its hot 🔥!</p>
          ) : (
            <p>That file type is not accepted</p>
          )
        ) : (
          <p>Upload images</p>
        )}

        {params.acceptedFiles?.length && (
          <div className="accepted-files mt-2">
            <ul className="list-unstyled">
              {params.acceptedFiles.map((file) => (
                <li key={file.name}>
                  {file.name} ({Math.round(file.size / 1024)}
                  kb)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {params.uploadAlbum.progress > 0 && (
        <ProgressBar
          now={params.uploadAlbum.progress}
          className="my-3"
          animated
          striped
          variant="success"
        />
      )}
    </>
  );
};

export default UploadAlbumDropzone;
