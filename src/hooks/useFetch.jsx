import { useAuth } from "@clerk/clerk-react";
import React, { useState } from 'react';

const useFetch = (cb, options = {}) => {

    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    const { getToken } = useAuth();

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try{
            const supabaseAccessToken = await getToken({ template: "supabase" });
            const response = await cb(supabaseAccessToken, options, ...args);
            setData(response);
            setError(null);
        } catch(error){
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { data, error, loading, fn };

}

export default useFetch;