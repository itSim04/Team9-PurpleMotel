import { Data } from '@angular/router';
import { Observable } from 'rxjs';
import { KeyValue } from "@angular/common";

export interface Column<Data> {


    key: keyof Data,
    type?: 'text' | 'boolean' | 'price' | 'rating' | 'custom' | 'link' | 'outer_link';
    custom?: (data: Data) => string; // Exclusively used with Custom

    header_alt?: string; // An alternative name for a header
    link?: {

        key: keyof Data,
        format_index?: string,
        format: (value: unknown, org?: Data) => string; // 'Unknown' represents the Linked data (aka the other Table's data)

    }; // Exclusively used with Link

    outer_link?: {

        key: keyof Data,
        index: number,
        format: (value: unknown, org?: Data) => string; // 'Unknown' represents the Linked data (aka the other Table's data)

    }; // Exclusively used with Outer Link


}

export interface ExtraColumn {


    key: string,
    type?: 'text' | 'selection' | 'boolean';
    custom?: (data: Data) => string; // Exclusively used with Custom

    header_alt?: string; // An alternative name for a header
    link?: {

        key: keyof Data,
        format: (value: unknown, org?: Data) => string; // 'Unknown' represents the Linked data (aka the other Table's data)

    }; // Exclusively used with Link

    outer_link?: {

        key: keyof Data,
        index: number,
        format: (value: unknown, org?: Data) => string; // 'Unknown' represents the Linked data (aka the other Table's data)

    }; // Exclusively used with Outer Link


}

export interface Button<Data> {


    label: string,

    concerned_data: keyof Data,
    format: (data: Data, result: unknown) => string,
    title: string,
    prompt: string,
    action: 'input',
    updater: (key: string, data: Data) => Observable<undefined>;


}

export interface DataInjection<Data> {

    title: string;
    permission: string;

    buttons?: Button<Data>[];
    special_case?: {

        rule: (data: Data) => boolean,
        color: string;
        alt_color: string;

    };
    displayed_columns: Column<Data>[]; // The columns of the database

    data_fetcher: (() => Observable<[Map<string, Data>, Map<string, unknown>[] | undefined]>) | undefined; // Fetches data for ONE table. Will not be applied if a dual fetcher is provided manually.

    hover_linker?: {

        index: number,
        key: keyof Data,
        filter: (t1: unknown, t2: unknown) => boolean;
        format: (data: [string, unknown]) => string;

    };
    hover_fetcher?: {

        key: keyof Data, // The foreign key of the data to fetch
        format: (value: unknown) => string[]; // The way the data is displayed in the popup

    }; // Fetches a list of item to display when hovered over a cell from the other table
    hover_display?: (data: Data) => string[] | undefined;


}

export interface Choices {

    choices?: [string, unknown][], // The list of choices. Will not be registered if link is True.
    link?: boolean, // Dictates whether the choices are hardcoded or will be taken from the other table
    index?: number;


    key?: (choice: [string, unknown]) => string, // The way every choice is identified (the key)
    format?: (choice: unknown) => string, // The way every choice is displayed
}
export interface OuterChoices {

    index: number;
    key?: (choice: [string, unknown]) => string, // The way every choice is identified (the key)
    format: (choice: unknown) => string, // The way every choice is displayed
    pivot_index?: number,
    pivot_format?: (choice: unknown) => string;
}


export interface Field<Data> {
    key: keyof Data, // Key of the field
    readonly?: boolean,

    raw?: boolean;
    unique?: boolean;
    type: 'text' | 'positive_digits_string' | 'digits_string' | 'selection' | 'choices' | 'number' | 'date' | 'outer_selection' | 'outer_choices' | 'toggle' | 'image';
    choices?: Choices; // Can only be used with selection and choices.
    outer_choices?: OuterChoices; // Can only be used with outer selection.
    condition?: (data: unknown) => boolean; // When to consider the value as satisfied. Not required with Text and Number

    condition_label?: string;
    formatting?: (data: Data) => string; // The way to display the value. NOT used
}
export interface Toggle<Data> {

    key: keyof Data, // Key of the data
    on_value: string, // Text displayed when on
    off_value: string; // Text displayed when off

    on_prompt?: string;
    off_prompt?: string;

    on_confirm?: string;
    off_confirm?: string;

    on_title?: string;
    off_title?: string;

}

export interface StaticField<Data> {
    key: string, // Key of the Field
    value?: (data: Data) => string; // Cannot be used with linked_value. Displays a static value extracted from the data
    link?: {

        format: (value: unknown) => string; // The way the data should be formatted
        value: (keyof Data); // The foreign key of the data

    }; // Cannot be used with value. Requires 2 tables. Displays a static value extracted from the other table. 

}

export interface ChangeInjection<Data> {


    affected_data?: KeyValue<string, Data>; // Old Data


    size?: number;

    modification_rule?: (data: Data) => boolean;
    permissions?: {

        rows: string[];
        columns: string[];
        update: (data: Data, label: string, result: number) => void;
        format: (result: boolean[]) => string;
        retrieve: (result: Data, label: string) => boolean[];
        key: keyof Data;

    };

    table?: {

        columns: ExtraColumn[];
        key: keyof Data;
        default_value: unknown;

    };
    side_panel: 'images' | 'image' | 'mixed' | 'permissions' | 'empty' | 'table';
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

