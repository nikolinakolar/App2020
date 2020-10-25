export const StorageConfig = {
    photo: {
      directory:  '../storage/photos/',
      urlPrefix: '/assets/photos',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      photoMaxFileSize: 1024 * 1024 * 4,
      resize: {
        square: {
            directory: 'resized/',
            width: 400,
            height: 400,
        },
      }
    },

    toppingImage: {
      directory:  '../storage/toppingImage/',
      urlPrefix: '/assets/toppingImage',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      photoMaxFileSize: 1024 * 1024 * 4,
      resize: {
        square: {
            directory: 'resized/',
            width: 100,
            height: 100,
        },
      }
    },

    allergenImage: {
      directory:  '../storage/allergenImage/',
      urlPrefix: '/assets/allergenImage',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      photoMaxFileSize: 1024 * 1024 * 4,
      resize: {
        square: {
            directory: 'resized/',
            width: 80,
            height: 80,
        },
      }
    }
    
  }