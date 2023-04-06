import { Observable } from 'rxjs';
import { KeyValue } from "@angular/common";

export interface Column<Data> {


    key: keyof Data,
    type?: 'text' | 'boolean' | 'price' | 'rating' | 'custom' | 'link';
    custom?: (data: Data) => string; // Exclusively used with Custom

    header_alt?: string; // An alternative name for a header
    link?: {

        key: keyof Data,
        format: (value: unknown) => string; // 'Unknown' represents the Linked data (aka the other Table's data)

    }; // Exclusively used with Link


}

export interface DataInjection<Data> {

    title: string;
    displayed_columns: Column<Data>[]; // The columns of the database
    
    data_fetcher: (() => Observable<Map<string, Data>>) | undefined; // Fetches data for ONE table. Will not be applied if a dual fetcher is provided manually.
    hover_fetcher?: {

        key: keyof Data, // The foreign key of the data to fetch
        format: (value: unknown) => string[]; // The way the data is displayed in the popup

    }; // Fetches a list of item to display when hovered over a cell from the other table
    hover_display?: (data: unknown) => string;


}

export interface Choices {

    choices?: [string, unknown][], // The list of choices. Will not be registered if link is True.
    link?: boolean, // Dictates whether the choices are hardcoded or will be taken from the other table
    key?: (choice: [string, unknown]) => string, // The way every choice is identified (the key)
    format?: (choice: unknown) => string, // The way every choice is displayed
}


export interface Field<Data> {
    key: keyof Data, // Key of the field
    type: 'text' | 'positive_digits_string' | 'digits_string' | 'selection' | 'choices' | 'number';
    choices?: Choices; // Can only be used with selection and choices.
    condition?: (data: unknown) => boolean; // When to consider the value as satisfied. Not required with Text and Number
    formatting?: (data: Data) => string; // The way to display the value. NOT used
}
export interface Toggle<Data> {

    key: keyof Data, // Key of the data
    on_value: string, // Text displayed when on
    off_value: string; // Text displayed when off

}

export interface StaticField<Data> {
    key: string, // Key of the Field
    value?: (data: Data) => string; // Cannot be used with linked_value. Displays a static value extracted from the data
    linked_value?: {

        format: (value: unknown) => string; // The way the data should be formatted
        value: (keyof Data); // The foreign key of the data

    }; // Cannot be used with value. Requires 2 tables. Displays a static value extracted from the other table. 

}

export interface ChangeInjection<Data> {
    affected_data?: KeyValue<string, Data>; // Old Data

    side_panel: 'images' | 'permissions' | 'empty'
    data_type: string; // Type of Data
    standalone_field?: Field<Data>; // The Field that appears alone
    toggle?: Toggle<Data>; // A button that appears in the lower area
    fields: Field<Data>[]; // The normal Fields
    static_fields?: StaticField<Data>[]; // Fields that do not change
    readonly default_state: Data; // The initial state of the Data
    add_service: (data: Data) => Observable<string>;
    modify_service: (key: string, data: Data) => Observable<undefined>;
    delete_service: (key: string) => Observable<string[]>;
    identifier: (data: Data) => string; // What is used to identify the data
}

