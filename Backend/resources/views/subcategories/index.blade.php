@extends('admin.admin_master')

@section('title')SubCategory Galoo Store | Admin @endsection

@section('content')
<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">SubCategory Galoo Store</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">SubCategory Galoo Store</li>
                    </ol>
                </nav>
            </div>
        </div>
        <!--end breadcrumb-->
        <div class="container">
            <div class="main-body">
                <div class="table-responsive">
                    <table id="datatable" class="table table-striped table-bordered bg-white border" style="width:100%">
                        <thead>
                            <tr>
                                <th>SL</th>
                                <th>Category_Id</th>
                                <th>Nama Subkategori</th>
                                <th>Gambar Subkategori</th>
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($subcategories as $key => $subcategory)
                            <tr>
                                <td>{{ $key+1 }}</td>
                                <td>{{ $subcategory->categories_id }}</td>
                                <td>{{ $subcategory->subcategory_name }}</td>
                                <td>
                                    <img src="{{ $subcategory->subcategory_image }}" alt="" width="80px" ">
                                </td>
                                <td>
                                    <a href="{{ route('admin.subcategories.edit', $subcategory->id) }}" class="btn btn-facebook text-white">Edit</a>
                                    <form action="{{ route('admin.subcategories.destroy', $subcategory->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn bg-danger text-white">Delete</button>
                                    </form>
                                </td>
                                <td>
                                    <form action="{{ route('admin.subcategories.toggleStatus', $subcategory->id) }}" method="POST" class="d-inline">
                                        @method('PUT')
                                        @csrf
                                        <button type="submit" class="btn bg-{{ $subcategory->status ? 'danger' : 'success' }} text-white">
                                            {{ $subcategory->status ? 'Nonaktifkan' : 'Aktifkan' }}
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
