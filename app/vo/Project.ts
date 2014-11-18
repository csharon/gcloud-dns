///<reference path='DNSBase.ts' />

module xd.dns.vo {

  export interface IProject {
    id:string;
  }

  export class Project extends DNSBase implements IProject {

    private _id:string;

    get id():string {
      return this._id;
    }

  }
}
