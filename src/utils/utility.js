import axios from "axios"

const imageUpload = async (image) =>{
    const formData = new FormData()
    formData.append('image', image)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=1c241d217b32dc80392c910707b7cee0`, formData)
    return data.data.display_url
} 

export default imageUpload;