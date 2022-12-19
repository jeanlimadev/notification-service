import { randomUUID } from 'crypto';
import { Replace } from 'src/helpers/Replace';
import { Content } from './content';

export interface NotificationProps {
  recipient_id: string;
  content: Content;
  category: string;
  canceled_at?: Date | null;
  read_at?: Date | null;
  created_at: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { created_at?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      created_at: props.created_at ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set recipient_id(recipient_id: string) {
    this.props.recipient_id = recipient_id;
  }

  public get recipient_id(): string {
    return this.props.recipient_id;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get category(): string {
    return this.props.category;
  }

  public get canceled_at(): Date | null | undefined {
    return this.props.canceled_at;
  }

  public cancel() {
    this.props.canceled_at = new Date();
  }

  public read() {
    this.props.read_at = new Date();
  }

  public unread() {
    this.props.read_at = null;
  }

  public get read_at(): Date | null | undefined {
    return this.props.read_at;
  }

  public get created_at(): Date {
    return this.props.created_at;
  }
}
