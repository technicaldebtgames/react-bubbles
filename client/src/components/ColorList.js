import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import './newColorStyles.css';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    
    e.preventDefault();
    
    axiosWithAuth()
      .put('/api/colors/' + colorToEdit.id, colorToEdit)
      .then(response => {

        axiosWithAuth()
          .get('/api/colors')
          .then(response => {

            updateColors(response.data);

          })
          .catch(error => {

            console.log(error);

          });

      })
      .catch(error => {

        console.log(error);

      });

  };

  const deleteColor = color => {
    
    axiosWithAuth()
      .delete('/api/colors/' + color.id)
      .then(response => {

        axiosWithAuth()
          .get('/api/colors')
          .then(response => {

            updateColors(response.data);

          })
          .catch(error => {

            console.log(error);

          });

      })
      .catch(error => {

        console.log(error);

      });

  };

  const handleNewColorChange = event => {

    if (event.target.name === 'new-color-name') {

      setNewColor({...newColor,
                   color: event.target.value});

    }
    else if (event.target.name === 'new-color-value') {

      setNewColor({...newColor,
                   code: {hex: event.target.value}});

    };

  };

  const addColor = () => {

    if (newColor.color !== '' || newColor.code.hex !== '') {

      axiosWithAuth()
        .post('/api/colors', newColor)
        .then(response => {
  
          updateColors(response.data);
  
        })
        .catch(error => {
  
          console.log(error);
  
        });

    }

  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <form className='new-color-form' onSubmit={addColor}>
        <label htmlFor='new-color-name'>New Color Name:</label>
        <input type='text' name='new-color-name' onChange={handleNewColorChange} />
        <label htmlFor='new-color-value'>New Color Value:</label>
        <input type='text' name='new-color-value' onChange={handleNewColorChange} />
        <button type='submit'>Add New Color</button>
      </form>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
