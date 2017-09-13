import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import { selectUserPhotos } from '/selectors/selectors';
import FriendListItem from './FriendListItem';
import FriendButton from './FriendButton';

const mapStateToProps = (state, { userId }) => {

  return ({
    photos: [
      { id: 1, url: 'https://art-s.nflximg.net/fb57f/49c9582e677c694c081f77d0350b26888e1fb57f.jpg' },
      { id: 2, url: 'http://static.tvtropes.org/pmwiki/pub/images/ArrestedDevelopment.jpg' },
      { id: 3, url: 'http://vignette3.wikia.nocookie.net/arresteddevelopment/images/6/6b/Season_3_square.jpg/revision/latest?cb=20111023065401' },
      { id: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Arrested_Development.svg/1200px-Arrested_Development.svg.png' },
      { id: 5, url: 'http://static3.businessinsider.com/image/5876ad25ee14b63e338b62f3-1190-625/the-entire-cast-of-arrested-development-will-return-for-a-new-season.jpg' },
      { id: 6, url: 'http://www.ukulelemag.com/wp-content/uploads/2016/04/ArrestedDevelopment.Cvr_.jpg' },
      { id: 7, url: 'http://www.indiewire.com/wp-content/uploads/2016/09/adinline.jpg' },
      { id: 8, url: 'https://pmcdeadline2.files.wordpress.com/2015/06/arrested-development-2.jpg?w=446&h=299&crop=1' },
      { id: 9, url: 'http://www.indiewire.com/wp-content/uploads/2013/05/arrested-development-cast.jpg' },
      { id: 0, url: 'https://www.episodegenerator.com/wp-content/uploads/Arrested-Development-Wallpaper-arrested-development-812320_1280_1024.jpg' },
    ],
  });
};

const mapDispatchToProps = (dispatch, ownProps) => ({

});

class ProfilePhotos extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    // TODO
  }

  handleUpdate() {
    // TODO
  }

  render() {
    return (
      <section className='profile-photos'>
        <nav>
          <h2>Photos</h2>
          <button onClick={ e => e.preventDefault() }>ToDo: Photo Upload</button>
        </nav>

        <ul>
          {
            this.props.photos.map( photo => (
              <li className='photo-item' key={`photo-${photo.id}`}>
                <img src={ photo.url }></img>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotos);
