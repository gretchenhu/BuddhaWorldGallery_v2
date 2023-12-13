import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./PhotoGallery.css";

function PhotosGallery({ photos }) {
  console.log("👏🏻 Render PhotosGallery photos=", photos);

  function renderPhotos() {
    function renderPhoto(photo) {
      return (
        <div className="col-4" key={photo._id}>
          <Link to={`/buddha/id/${photo._id}`} className="photo-link">
            <img src={photo.image} width={250} height={250} alt={photo.name} />
            <div>{photo.name}</div>
            <div>{photo.dynasty} Dynasty</div>
            <div>{photo.museum}</div>
          </Link>
        </div>
      );
    }

    return photos.map(renderPhoto);
  }

  return <div className="row">{renderPhotos()}</div>;
}

PhotosGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      dynasty: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      museum: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default PhotosGallery;
