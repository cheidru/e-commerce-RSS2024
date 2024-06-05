import React, { useState } from 'react';
import Modal from 'react-modal';
import { CarouselProvider, Slider, Slide, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

type ProductSliderProps = {
  images: { src: string; id: string }[];
};

function ProductSliderWithModal({
  images,
}: ProductSliderProps): React.ReactElement {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginRight: '20px',
        }}
      >
        {images.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={`Thumbnail ${index + 1}`}
            style={{
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              marginBottom: '10px',
              border: selectedImageIndex === index ? '2px solid blue' : 'none',
            }}
            onClick={() => setSelectedImageIndex(index)}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedImageIndex(index)}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={images.length}
          visibleSlides={1}
          infinite
          isPlaying={false}
          currentSlide={selectedImageIndex}
        >
          <Slider>
            {images.map((image, index) => (
              <Slide key={image.id} index={index}>
                <img
                  src={image.src}
                  alt={`Product ${index + 1}`}
                  style={{ width: '100%', cursor: 'pointer' }}
                  onClick={() => openModal(index)}
                  onKeyDown={(e) => e.key === 'Enter' && openModal(index)}
                  role="button"
                  tabIndex={0}
                />
              </Slide>
            ))}
          </Slider>
          <DotGroup
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          />
        </CarouselProvider>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={125}
          totalSlides={images.length}
          visibleSlides={1}
          infinite
          isPlaying={false}
          currentSlide={selectedImageIndex}
        >
          <Slider>
            {images.map((image, index) => (
              <Slide key={image.id} index={index}>
                <img
                  src={image.src}
                  alt={`Product ${index + 1}`}
                  style={{ width: '100%' }}
                />
              </Slide>
            ))}
          </Slider>
          <DotGroup
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          />
        </CarouselProvider>
        <button
          onClick={closeModal}
          style={{ display: 'block', margin: '10px auto' }}
          type="button"
        >
          Close
        </button>
      </Modal>
    </div>
  );
}

export default ProductSliderWithModal;
