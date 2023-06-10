import axios from 'axios';
import { Input, Button, Space, Tooltip, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useContext, useEffect } from 'react';
import { MyContext } from '../../context/context.js';
import './searchBox.css';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

const SearchBox = () => {
  const { position, setPosition } = useContext(MyContext);
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Add mounted class to title after component mounts
    const titleElement = document.querySelector('.search-box-title');
    titleElement.classList.add('mounted');

    // Add mounted class to input after a short delay
    const inputElement = document.querySelector('.search-box-input');
    setTimeout(() => {
      inputElement.classList.add('mounted');
    }, 500);

    // Add mounted class to search button after 1.5 seconds
    const buttonElement = document.querySelector('.search-button');
    setTimeout(() => {
      buttonElement.classList.add('mounted');
    }, 1500);
  }, []);

  const handleSearch = () => {
    // Search
    const params = {
      q: searchText,
      format: 'json',
      addressDetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    axios
      .get(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => {
        console.log(response.data);
        setListPlace(response.data);
      })
      .catch((err) => console.log('err: ', err));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='searchBox page search-box'>
      <h1 className='search-box-title'>
        Input your gig address to discover available hosts in the area
      </h1>
      <div className='supraSearchBoxContainer'>
        <div className='search-div'>
          <div style={{ flex: 1 }}>
            <Input
              className='search-box-input'
              placeholder='Stay for your next gig here'
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              onKeyPress={handleKeyPress}
            />
            <Button
              className='search-button'
              shape='circle'
              icon={<SearchOutlined />}
              onClick={handleSearch}
            />
          </div>
          <div>
            <Space direction='vertical' size={12}>
              {/* <RangePicker />  */}
            </Space>
          </div>
        </div>
        <div className='list'>
          <List size='small'>
            {listPlace.map((item) => (
              <div
                key={item?.osm_id}
                style={{
                  display: 'flex',
                }}
              >
                <img
                  src='https://img.freepik.com/premium-vector/red-pin-point-isolated-white-background_120819-360.jpg'
                  alt='locationIcon'
                  style={{ width: 38, height: 38 }}
                />
                <List.Item
                  className='list-item'
                  onClick={() => {
                    setPosition(item);
                    navigate(`/mapsearch?lat=${item.lat}&lon=${item.lon}`);
                  }}
                >
                  {item?.display_name}
                </List.Item>
              </div>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
