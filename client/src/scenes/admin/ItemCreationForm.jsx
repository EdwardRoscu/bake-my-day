import React, {useState} from 'react';
import axios from 'axios';

const ItemCreationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        longDescription: '',
        price: '',
        category: 'cakes',
        image: null
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({...formData, image: file});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithImage = new FormData();
        formDataWithImage.append('data', JSON.stringify(formData));
        formDataWithImage.append('files.image', formData.image);

        try {
            const response = await axios.post('http://localhost:4000/api/items', formDataWithImage, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Item created:', response.data);
            // update the UI
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="image">Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="shortDescription">Short Description:</label>
                <input
                    type="text"
                    id="shortDescription"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="longDescription">Long Description:</label>
                <textarea
                    id="longDescription"
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="cakes">Cakes</option>
                    <option value="cookies">Cookies</option>
                    <option value="pies">Pies</option>
                </select>
            </div>

            <button type="submit">Create Item</button>
        </form>
    );
};

export default ItemCreationForm;
