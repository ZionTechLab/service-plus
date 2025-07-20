class PartnerService {
  constructor() {
    this.storageKey = 'partners';
  }

  
 createPartner(partnerData) {
    try {
      const partners = this.getAllPartners();
      const newId = this.getNextId(partners);
      
      const newPartner = {
        id: newId,
        ...partnerData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      partners.push(newPartner);
      localStorage.setItem(this.storageKey, JSON.stringify(partners));
      
      return newPartner;
    } catch (error) {
      console.error('Error creating partner:', error);
      throw new Error('Failed to create partner');
    }
  }
  getPartnerById(id) {
    // console.log("Fetching partner with ID:", id);
    try {
      const partners = this.getAllPartners();
        // console.log("Fetching partner with ID:", partners);
        var xx=partners.find(partner => partner.id == id) || null
        // console.log("Found partner:", xx);
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