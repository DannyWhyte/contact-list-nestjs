import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { contactsInterface } from './contacts.model';
import { ContactsService } from './contacts.service';
import { ContactsEntityClass } from './contacts.entity';


@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) { }

    @Get()
    getAllContacts(): contactsInterface[] {
        return this.contactsService.getAllContacts()
    }

    @Get(':id')
    getContactById(@Param('id') contactId: string): contactsInterface {
        return this.contactsService.getContactById(contactId)
    }

    @Post()
    addContact(@Body('name') name: string,
        @Body('phoneNumber') phoneNumber: number,
        @Body('email') email: string,
        @Body('adderss') adderss: string): { id: string } {
        return { id: this.contactsService.addContact(name, phoneNumber, email, adderss) }
    }

    @Patch(':id')
    updateContactById(@Param('id') contactId: string, @Body('name') name: string,
        @Body('phoneNumber') phoneNumber: number,
        @Body('email') email: string,
        @Body('adderss') adderss: string): boolean {
        return this.contactsService.updateContactById(contactId, name, phoneNumber, email, adderss)
    }

    @Delete(':id')
    deleteContactById(@Param('id') contactId: string): boolean {
        return this.contactsService.deleteContactById(contactId)
    }

    @Get('db')
    async getAllContactsFromDb(): Promise<ContactsEntityClass[]> {
        return await this.contactsService.getAllContactsFromDb()
    }

    @Get('db/:id')
    async getContactByIdFromDb(@Param('id') contactId: string): Promise<ContactsEntityClass> {
        return await this.contactsService.getContactFromDbById(contactId)
    }

    @Post('db')
    async addMultipleContactsDb(@Body() contcatsArr: contactsInterface[]): Promise<{ id: number }[]> {
        return await this.contactsService.addMultipleContactsDb(contcatsArr)
    }

    @Patch('db/:id')
    async  updateContactByIdDb(@Param('id') contactId: string, @Body('name') name: string,
        @Body('phoneNumber') phoneNumber: number,
        @Body('email') email: string,
        @Body('address') address: string): Promise<boolean> {
        return await this.contactsService.updateContactByIdDb(contactId, name, phoneNumber, email, address)
    }

    @Delete('db/:id')
    async deleteContactByIdDb(@Param('id') contactId: string): Promise<Boolean> {
        return await this.contactsService.deleteContactByIdDb(contactId)
    }
}
