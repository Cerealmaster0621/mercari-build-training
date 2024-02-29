import React, { useEffect, useState } from 'react';

interface Item {
  id: number;
  name: string;
  category_name: string;
  image_name: string;
};

const server = process.env.REACT_APP_API_URL || 'http://127.0.0.1:9000';
const placeholderImage = process.env.PUBLIC_URL + '/logo192.png';

interface Prop {
  reload?: boolean;
  onLoadCompleted?: () => void;
  searchKeyword:string;
}

export const ItemList: React.FC<Prop> = (props) => {
  const { reload = true, onLoadCompleted, searchKeyword } = props;
  const [items, setItems] = useState<Item[]>([])
  const fetchItems = () => {
    fetch(server.concat('/items'),
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('GET success:', data);
        setItems(data.items);
        onLoadCompleted && onLoadCompleted();
      })
      .catch(error => {
        console.error('GET error:', error)
      })
  }
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    item.category_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  useEffect(() => {
    if (reload) {
      fetchItems();
    }
  }, [reload]);

  return (
    <div className='ItemList'>
      {filteredItems.map((item) => {
        const imgUrl = item.image_name ?`${server}/image/${item.image_name}`: placeholderImage;
        return (
          <div key={item.id} className="Item">
            <img 
              src={imgUrl} 
              alt={item.name} 
              onError={(e)=>(e.currentTarget.src = placeholderImage)}
              className='image'
            />
            <p>
              <span className='name'>{item.name}</span>
              <br />
              <span className='category'>{item.category_name}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
};
