import { Injectable, NotFoundException } from '@nestjs/common';
import { contactsInterface } from './contacts.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactsEntityClass } from './contacts.entity';

@Injectable()
export class ContactsService {
    constructor(
        @InjectRepository(ContactsEntityClass)
        private readonly contactsRepository: Repository<ContactsEntityClass>,
    ) { }
    private contactsData: contactsInterface[] = []

    private getContactIndexById(contactId: string): number {
        let index = this.contactsData.findIndex(singleContact => singleContact.id === contactId)
        if (index < 0) throw new NotFoundException('No such contact found.')
        return index
    }

    getAllContacts(): contactsInterface[] {
        return [...this.contactsData]
    }

    getContactById(contactId: string): contactsInterface {
        return { ...this.contactsData[this.getContactIndexById(contactId)] }
    }

    addContact(name: string, phoneNumber: number, email: string, adderss: string): string {
        const contactId = Math.random().toString().split('.')[1];
        this.contactsData.push({
            id: contactId,
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            adderss: adderss
        })
        return contactId
    }

    updateContactById(contactId: string, name: string, phoneNumber: number, email: string, adderss: string): boolean {
        let updateData = this.contactsData[this.getContactIndexById(contactId)]
        updateData.name = name || updateData.name
        updateData.adderss = adderss || updateData.adderss
        updateData.phoneNumber = phoneNumber || updateData.phoneNumber
        updateData.email = email || updateData.email
        return true
    }

    deleteContactById(contactId: string): boolean {
        this.contactsData.splice(this.getContactIndexById(contactId), 1)
        return true
    }

    async getAllContactsFromDb(): Promise<ContactsEntityClass[]> {
        return await this.contactsRepository.find()
    }

    async getContactFromDbById(contactId: string): Promise<ContactsEntityClass> {
        const contact = await this.contactsRepository.findOne({ where: { id: contactId } })
        if (!contact) throw new NotFoundException('No such contact found.')
        return contact
    }

    async addMultipleContactsDb(contacts: contactsInterface[]): Promise<{ id: number }[]> {
        const insertIds = await this.contactsRepository.insert(contacts)
        return insertIds.raw
    }

    async updateContactByIdDb(contactId: string, name: string, phoneNumber: number, email: string, address: string): Promise<boolean> {
        let updateData = await this.getContactFromDbById(contactId)
        updateData.name = name || updateData.name
        updateData.address = address || updateData.address
        updateData.phone_number = phoneNumber || updateData.phone_number
        updateData.email = email || updateData.email
        let upateDataResponse = await this.contactsRepository.update({ id: contactId }, updateData)
        return upateDataResponse.affected > 0
    }

    async deleteContactByIdDb(contactId: string): Promise<boolean> {
        let contactsData = await this.getContactFromDbById(contactId)
        let deletedData = await this.contactsRepository.delete(contactId)
        return deletedData.affected > 0
    }
}
