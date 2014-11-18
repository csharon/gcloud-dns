///<reference path='DNSBase.ts' />
///<reference path='ResourceRecord.ts' />

module xd.dns.vo {

  export interface IChangeSet {
    id:string;
    additions:Array<IResourceRecord>;
    deletions:Array<IResourceRecord>;
    startTime:string;
    status:string;
  }

  export class ChangeSet extends DNSBase implements IChangeSet {

    private _id:string;
    get id():string {
      return this._id;
    }

    private _startTime:string;
    get startTime():string {
      return this._startTime;
    }

    private _status:string;
    get status():string {
      return this._status;
    }

    private _additions:Array<ResourceRecord>;
    get additions():Array<ResourceRecord> {
      return this._additions;
    }

    set additions(val:Array<ResourceRecord>) {
      this._additions = val;
    }

    private _deletions:Array<ResourceRecord>;
    get deletions():Array<ResourceRecord> {
      return this._deletions;
    }

    set deletions(val:Array<ResourceRecord>) {
      this._deletions = val;
    }

  }
}


