import { priorities, inquiryTypes } from "./inquiryOptions";

class InquaryService {
  constructor() {
    this.storageKey = "inquiries";
  }

  createInquary(inquaryData) {
    try {
      const inquaries = this.getAllInquairies();
      let updatedInquary;

      if (inquaryData.id!==0) {
        // Update existing inquary
        const idx = inquaries.findIndex((i) => i.id === inquaryData.id);
        if (idx !== -1) {
          updatedInquary = {
            ...inquaries[idx],
            ...inquaryData,
            updatedAt: new Date().toISOString(),
          };
          inquaries[idx] = updatedInquary;
        } else {
          // If not found, treat as new
          updatedInquary = {
            id: inquaryData.id,
            ...inquaryData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          inquaries.push(updatedInquary);
        }
      } else {
        // Create new inquary
        const newId = this.getNextId(inquaries);
        updatedInquary = {
        
          ...inquaryData,  id: newId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        inquaries.push(updatedInquary);
      }
      localStorage.setItem(this.storageKey, JSON.stringify(inquaries));
      return updatedInquary;
    } catch (error) {
      console.error("Error creating inquary:", error);
      throw new Error("Failed to create inquary");
    }
  }

  getInquaryById(id) {
    try {
      
 console.log("Fetched inquaries:", id);
      const inquaries = this.getAllInquairies_row();
      console.log("Fetched inquaries:", inquaries);
      return inquaries.find((inquary) => inquary.id === id) || null;
    } catch (error) {
      console.error("Error getting inquary:", error);
      return null;
    }
  }
  getAllInquairies_row() {
    try {
      const inquiries = JSON.parse(localStorage.getItem(this.storageKey));
      return inquiries ? inquiries : [];
    } catch (error) {
      console.error("Error getting inquiries:", error);
      return [];
    }
  }

  getAllInquairies() {
    try {
      const inquiries = JSON.parse(localStorage.getItem(this.storageKey));
      const partners = JSON.parse(localStorage.getItem("partners"));

      const joined = (inquiries || []).map(({ customer, priority, serviceType,assignee, ...rest }) => {
        const partner = (partners || []).find((p) => p.id === customer);

        // eslint-disable-next-line eqeqeq
        const priorityObj = priorities.find((p) => p.key == priority);
// eslint-disable-next-line eqeqeq
        const serviceTypeObj = inquiryTypes.find((t) => t.key == serviceType);
  // eslint-disable-next-line eqeqeq
                const AsigneeObj = partners.find((t) => t.id == assignee);
        return {
          ...rest,
          customer,
          partnerName: partner?.partnerName || "",
          contactPerson: partner?.contactPerson || "",
          email: partner?.email || "",
          address: partner?.address || "",
          phone1: partner?.phone || "",
          phone2: partner?.phone2 || "",
          // priority,
          priority: priorityObj ?  priorityObj.value :priority,
          // serviceType,
          serviceType: serviceTypeObj ?  serviceTypeObj.value: serviceType,
          assignee: AsigneeObj ?  AsigneeObj.partnerName: assignee,
        };
      });
      console.log("Fetched inquiries:", joined);
      return joined ? joined : [];
    } catch (error) {
      console.error("Error getting inquiries:", error);
      return [];
    }
  }

  getNextId(inquaries) {
    if (inquaries.length === 0) return 1;
    return Math.max(...inquaries.map((i) => i.id)) + 1;
  }
}

const inquaryServiceInstance = new InquaryService();
export default inquaryServiceInstance;
