import { getAllcontacts, getContactById } from "../servises/contacts";



export const getContactsController = async (req, res) => {
    const contacts = await getAllcontacts();
    res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    };

export const getContactsByIdController = async (req,res) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found contact with id {**contactId**}!',
      data: contact,
    });
  };