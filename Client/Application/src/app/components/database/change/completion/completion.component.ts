import { Field } from 'src/app/models/Database';
import { Component, Input } from '@angular/core';
import { isNum, Required } from '../../database.component';
import { KeyValue } from '@angular/common';
import { parseDate } from 'src/app/pages/authentication/authentication.utility';

@Component({
  selector: 'app-completion',
  templateUrl: './completion.component.html',
  styleUrls: ['./completion.component.scss']
})
export class CompletionComponent<Data> {

  updateDate(s: any) {

    this.data[this.field.key] = (s as CustomEvent).detail.value;

  }


  @Input() @Required field!: Field<Data>;

  @Input() @Required fields!: Field<Data>[];
  @Input() @Required data!: Data;
  @Input() @Required modification_mode = false;
  @Input() @Required modification_rule = ((data: unknown) => true);

  @Input() @Required linked_data?: Map<string, unknown>;
  @Input() @Required outer_data: Map<string, unknown>[] | undefined;
  @Input() @Required uniqueness: boolean = true;

  formatLabel(word: string | number | symbol) {

    if (!word) return word;

    const splits = word.toString().replaceAll("_", " ").split(" ");

    for (let i = 0; i < splits.length; i++) {

      splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

    }


    return splits.join(" ");
  }

  formatOuterChoice(field: Field<Data>, type: KeyValue<string, unknown>) {

    if (field.outer_choices && this.outer_data) {

      let temp = field.outer_choices.format(type.value);


      if (field.outer_choices.pivot_index && field.outer_choices.pivot_format) {

        temp = field.outer_choices.pivot_format(this.outer_data[field.outer_choices.pivot_index].get(temp));

      }

      return temp;

    }

    return undefined;

  }

  isNum(val: string) {

    return isNum(val);

  }

  parseDate(date: string): any {

    return parseDate(new Date(date));

  }

  get fieldsCompleteness() {

    for (const field of this.fields) {

      if (field.condition ? !field.condition(this.data[field.key]) : !this.data[field.key]) {

        return false;

      }

    }
    return true;

  }

}
