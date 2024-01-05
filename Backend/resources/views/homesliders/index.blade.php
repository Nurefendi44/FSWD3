@extends('admin.admin_master')

@section('title')Home Slider Galoo Store | Admin @endsection

@section('content')
<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">All Home Slider</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">All Home Slider</li>
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
                                <th>Gambar Home Slider</th>
                                <th>Action</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($homesliders as $key => $homeslider)
                            <tr>
                                <td>{{ $key+1 }}</td>
                                <td><img src="{{ $homeslider->slider_image }}" alt="image" width="80px"></td>
                                <td>
                                    <a href="{{ route('admin.homesliders.edit',$homeslider->id) }}" class="btn btn-info text-white">Edit</a>
                                    <form action="{{ route('admin.homesliders.destroy', $homeslider->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn bg-danger text-white">Delete</button>
                                    </form>
                                </td>
                                <td>
                                    <form action="{{ route('admin.homesliders.toggleStatus', $homeslider->id) }}" method="POST" class="d-inline">
                                        @method('PUT')
                                        @csrf
                                        <button type="submit" class="btn btn bg-{{ $homeslider->status ? 'danger' : 'success' }} text-white">
                                            {{ $homeslider->status ? 'Nonaktifkan' : 'Aktifkan' }}
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
