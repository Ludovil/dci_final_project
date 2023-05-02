// axios
import axios from 'axios';
import { useState } from 'react';
import { Input, Button, Space, Tooltip, Divider, List, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

const { RangePicker } = DatePicker;

const SearchBox2 = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Input
            style={{ width: '100%' }}
            placeholder='Where do you want to play?'
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div>
          <Space direction='vertical' size={12}>
            <RangePicker />
          </Space>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Space direction='vertical'>
            <Space wrap>
              <Tooltip title='search'>
                <Button
                  shape='circle'
                  icon={<SearchOutlined />}
                  onClick={() => {
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
                  }}
                />
              </Tooltip>
            </Space>
          </Space>
        </div>
      </div>
      <div>
        <List size='small' bordered>
          {listPlace.map((item) => {
            return (
              <div key={item?.osm_id} style={{ display: 'flex' }}>
                <img
                  src='https://img.freepik.com/premium-vector/red-pin-point-isolated-white-background_120819-360.jpg'
                  alt='locationIcon'
                  style={{ width: 38, height: 38 }}
                />
                <List.Item
                  onClick={() => {
                    setSelectPosition(item);
                  }}
                >
                  {item?.display_name}
                </List.Item>
              </div>
            );
          })}
          {/* <Divider orientation='left'></Divider> */}
        </List>
      </div>
    </div>
  );
};
export default SearchBox2;
