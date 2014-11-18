///<reference path='DNSBase.ts' />
module xd.dns.vo {
  export interface IResourceRecord {
    name:string;
    type:string;
    ttl:number;
    rrdatas:Array<string>;
  }

  export class ResourceRecord extends DNSBase implements IResourceRecord {

    private _name:string;
    get name():string {
      return this._name;
    }

    set name(val:string) {
      this._name = val;
    }

    private _type:string;
    get type():string {
      return this._type;
    }

    set type(val:string) {
      this._type = val;
    }

    private _ttl:number;
    get ttl():number {
      return this._ttl;
    }

    set ttl(val:number) {
      this._ttl = val;
    }

    private _rrdatas:Array<string>;
    get rrdatas():Array<string> {
      return this._rrdatas;
    }

    set rrdatas(val:Array<string>) {
      this._rrdatas = val;
    }

    label():string {
      return this.type + ' Name: ' + this.name + ' Value: ' + this.rrdatas.join(' ');
    }
  }
}
