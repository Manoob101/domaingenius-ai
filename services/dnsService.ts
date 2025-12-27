
export const checkDomainAvailability = async (domainName: string): Promise<boolean> => {
  try {
    // Check for NS records of the domain.
    // If Status is 3 (NXDOMAIN), the domain likely doesn't exist (Available).
    // If Status is 0 (NOERROR), the domain is likely registered.
    const response = await fetch(`https://dns.google/resolve?name=${domainName}.com&type=NS`);
    
    if (!response.ok) {
        // If the fetch fails (network error), we assume taken to be safe or maybe handle error differently.
        // But for this simple app, returning false (Taken) is safer than showing available when it's not.
        return false;
    }

    const data = await response.json();
    
    // Status 3 = NXDOMAIN (Non-Existent Domain) => Available
    return data.Status === 3;
  } catch (error) {
    console.error(`Error checking domain ${domainName}:`, error);
    return false;
  }
};
