<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Template;
use App\Models\Area;

class TemplateController extends Controller
{
    public function getAll()
    {
        $templates = Template::all();
        return response()->json($templates);
    }

    public function save(Request $req)
    {
        $req->validate([
            'name' => 'required|string|unique:templates,name',
            'mockup_front' => 'required|file|mime:png',
            'mockup_back' => 'required|file|mime:png',
            'overlay_front' => 'required|file|mime:svg',
            'overlay_back' => 'required|file|mime:svg',
            'custom_areas' => 'required|json'
        ], [
            'name.unique' => 'Já existe um modelo com este nome cadastrado no sistema.'
        ]);

        $mockup_front = $req->file('mockup_front')->storePublicly('mockups', 'public');
        $mockup_back = $req->file('mockup_back')->storePublicly('mockups', 'public');
        $overlay_front = $req->file('overlay_front')->storePublicly('overlays', 'public');
        $overlay_back = $req->file('overlay_back')->storePublicly('overlays', 'public');

        $template = Template::create([
            'name' => $req->name,
            'mockup_front' => $mockup_front,
            'mockup_back' => $mockup_back,
            'overlay_front' => $overlay_front,
            'overlay_back' => $overlay_back
        ]);

        foreach ($req->custom_areas as $area) {
            $area = json_decode($area);
            Area::create([
                'name' => $area->name,
                'index' => $area->index,
                'template_id' => $template->id
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Modelo salvo com sucesso.'
        ]);
    }

    public function update(Request $req) 
    {
        $req->merge([ 'id' => $req->route('id') ]);

        $req->validate([
            'id' => 'required|numeric',
            'name' => 'required|string'
        ]);

        Template::where('id', $req->id)->update([
            'name' => $req->name
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Modelo atualizado com sucesso.'
        ]);
    }
}
