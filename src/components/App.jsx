import React, { Component, useState,useEffect } from 'react';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import * as Services from 'services/pixabayAPI';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';




export const App = () =>
{

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [modalImage, setModalImage] = useState({});
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setShowLoadMore(false);
      setGalleryData([]);
      setNoResults(false);
      setCurrentPage(1);

      const response = await Services.getImages(searchTerm, currentPage);
      const data = response.data;
      const newGalleryData = data.hits;
      const newShowLoadMore = data.totalHits > currentPage * 12;
      setLoading(false);
      setNoResults(data.totalHits === 0);
      setGalleryData(newGalleryData);
      setShowLoadMore(newShowLoadMore);
    };

    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);


    useEffect(() => {
    const fetchMoreData = async () => {
      const response = await Services.getImages(searchTerm, currentPage);
      const newGalleryData = response.data.hits;
      setGalleryData(prevGalleryData => [...prevGalleryData, ...newGalleryData]);

      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    if (currentPage !== 1) {
      fetchMoreData();
    }
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);
    
    const handleSearch = newSearchTerm => {
    setSearchTerm(newSearchTerm);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };
  const showModal = image => {
    setIsModalShown(true);
    setModalImage(image);
  };

  const closeModal = () => {
    setIsModalShown(false);
  };
   return (
      <AppContainer>
        <Searchbar onSubmit={handleSearch} />
        {loading && <Loader />}
        {noResults ? <p>No results found for '{searchTerm}'</p> : <ImageGallery gallery={galleryData} showModal={showModal} />}
        {showLoadMore && <Button onClick={handleLoadMore}>Load more</Button>}
        {isModalShown && <Modal largeImgObj={modalImage} closeModal={closeModal} />}
      </AppContainer>
    );
  }