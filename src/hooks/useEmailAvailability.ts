import { useState } from "react";

export default function useEmailAvailability() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    
}