class PartnerService {
  constructor() {
    this.storageKey = 'partners';
  }

  
  createPartner(partnerData) {
    try {
      const partners = this.getAllPartners();
      let updatedPartner;
      if (partnerData.id) {
        // Update existing partner
        const idx = partners.findIndex(p => p.id === partnerData.id);
        if (idx !== -1) {
          updatedPartner = {
            ...partners[idx],
            ...partnerData,
            updatedAt: new Date().toISOString()
          };
          partners[idx] = updatedPartner;
        } else {
          // If not found, treat as new
          updatedPartner = {
            id: partnerData.id,
            ...partnerData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          partners.push(updatedPartner);
        }
      } else {
        // Create new partner
        const newId = this.getNextId(partners);
        updatedPartner = {
          id: newId,
          ...partnerData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        partners.push(updatedPartner);
      }
      localStorage.setItem(this.storageKey, JSON.stringify(partners));
      return updatedPartner;
    } catch (error) {
      console.error('Error creating partner:', error);
      throw new Error('Failed to create partner');
    }
  }
  getPartnerById(id) {
    try {
      console.log("Fetching partner by ID:", id);
      const partners = this.getAllPartners();
        // eslint-disable-next-line eqeqeq
        var xx=partners.find(partner => partner.id == id) || null
      return xx;
    } catch (error) {
      console.error('Error getting partners:', error);
      return null;
    }
  }
  
  getAllPartners() {
    try {
      const partners = localStorage.getItem(this.storageKey);
      return partners ? JSON.parse(partners) : [];
    } catch (error) {
      console.error('Error getting partners:', error);
      return [];
    }
  }

 getNextId(partners) {
    if (partners.length === 0) return 1;
    return Math.max(...partners.map(partner => partner.id)) + 1;
  }


  
}

const partnerServiceInstance = new PartnerService();
export default partnerServiceInstance;