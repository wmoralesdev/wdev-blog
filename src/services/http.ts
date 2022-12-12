import axios from 'axios';

const createInstance = () => {
    const instance = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_HOST_URL}/api`,
    });

    instance.interceptors.response.use((res) => ({ data: res.data, status: res.status }) as any);

    return instance;
};

export default createInstance;
