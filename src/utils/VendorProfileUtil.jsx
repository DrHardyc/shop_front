import {fetchVendorProfile} from "@/service/VendorService.jsx";
import {useEffect, useRef, useState} from "react";

export const useVendorData = () => {
    const [companyData, setCompanyData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const effectExecuted = useRef(false);

    const fetchCompanyData = async () => {
        try {
            const data = await fetchVendorProfile();
            if (data.logoLink === null || data.logoLink === undefined || data.logoLink.trim().length === 0 ) {
                data.logoLink = "http://localhost:8080/uploads/defaultLogo.svg";
            } else {
                data.logoLink = "http://localhost:8080/" + data.logoLink;
            }
            setCompanyData(data);

        } catch (err) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!effectExecuted.current) {
            effectExecuted.current = true;
            fetchCompanyData();
        }
    }, []);

    return { companyData, isLoading, error };
};