import {useEffect, useRef, useState} from "react";
import {fetchBuyerProfile} from "@/service/BuyerService.jsx";

export const useBuyerData = () => {
    const [buyerData, setBuyerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const effectExecuted = useRef(false);

    const fetchBuyerData = async () => {
        try {
            const data = await fetchBuyerProfile();
            setBuyerData(data);
        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!effectExecuted.current) {
            effectExecuted.current = true;
            fetchBuyerData();
        }
    }, []);

    return { buyerData, isLoading, error };
};