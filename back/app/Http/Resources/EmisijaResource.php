<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmisijaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'naslov' => $this->naslov,
            'datum' => $this->datum->toIso8601String(),
            'tip'=>$this->tip,
            'file' => route('emisija.file', ['id' => $this->id]),
            'autori'=>UserResource::collection($this->podcast->autori)
        ];
    }

    // private function getFile(){
    //     if($this->tip==='video/mp4')
    //     return route('emisija.video', ['id' => $this->id]);
    //     return asset($this->file);

    // }
}
