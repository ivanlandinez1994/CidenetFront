import { Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';

@Injectable({
    providedIn: 'root'
})
export class EncryptService{

    encryptSha256(word : string) : string{
        return sha256(word);
    }
}