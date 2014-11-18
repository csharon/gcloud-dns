///<reference path='DNSBase.ts' />

module xd.dns.vo {

  export interface IManagedZone {
    id:string;
    name:string;
    dnsName:string;
    description:string;
    nameServers:Array<string>;
    creationTime:string;
  }

  export class ManagedZone extends DNSBase implements IManagedZone {

    private _id:string;
    get id():string {
      return this._id;
    }

    private _name:string;
    get name():string {
      return this._name;
    }

    set name(val:string) {
      this._name = val;
    }

    private _dnsName:string;
    get dnsName():string {
      return this._dnsName;
    }

    set dnsName(val:string) {
      this._dnsName = val;
    }

    private _description:string;
    get description():string {
      return this._description;
    }

    set description(val:string) {
      this._description = val;
    }

    private _nameServers:Array<string>;
    get nameServers():Array<string> {
      return this._nameServers;
    }

    private _creationTime:string;
    get creationTime():string {
      return this._creationTime;
    }

  }
}
