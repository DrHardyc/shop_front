import {fetchVendorLogo, fetchVendorProfile} from "@/service/VendorService.jsx";
import {useEffect, useRef, useState} from "react";

export const useVendorData = () => {
    const [companyData, setCompanyData] = useState(null);
    const [logo, setLogo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const effectExecuted = useRef(false);

    const fetchLogo = async () => {
        try {
            const data = await fetchVendorLogo();
            setLogo(data);
        } catch (err) {
            setError({ logo: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCompanyData = async () => {
        try {
            const data = await fetchVendorProfile();
            setCompanyData(data);
        } catch (err) {
            setError({ company: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!effectExecuted.current) {
            effectExecuted.current = true;
            fetchCompanyData();
            fetchLogo();
        }

        return () => {
            // if (logo) {
            //     URL.revokeObjectURL(logo);
            // }
        };
    }, []);

    return { companyData, logo, isLoading, error };
};