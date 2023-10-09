import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from '../Firebase/Firebase.config'

export const uploadImageToFirestore = async (imgRef,image) => {
    const imageId = uuidv4().replace(/-/g, '').slice(0, 6);
    const imageRef = ref(storage, `${imgRef}/${imageId}-${image?.name}`);
    const snapshot = await uploadBytes(imageRef, image);
    const imgUrl = await getDownloadURL(snapshot.ref);
    return imgUrl;
};
