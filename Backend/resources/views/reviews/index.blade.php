@extends('admin.admin_master')

@section('title')Review Galoo Store | Admin @endsection

@section('content')
<div class="page-wrapper">
    <div class="page-content">
        <!--breadcrumb-->
        <div class="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
            <div class="breadcrumb-title pe-3">All Review</div>
            <div class="ps-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class="bx bx-home-alt"></i></a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">All Review</li>
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
                                <th>Products_Id</th>
                                <th>Visitors_Id</th>
                                <th>Nama Reviewer</th>
                                <th>Gambar Review</th>
                                <th>Rating Review</th>
                                <th>Komen Review</th>
                                <th>Action</th>
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($reviews as $key => $review)
                            <tr>
                                <td>{{ $key+1 }}</td>
                                <td>{{ $review->products_id }}</td>
                                <td>{{ $review->visitors_id }}</td>
                                <td>{{ $review->reviewer_name }}</td>
                                <td>
                                    <img src="{{ $review->reviewer_image }}" alt="" width="80px" ">
                                </td>
                                <td>{{ $review->reviewer_rating }}</td>
                                <td>{{ $review->reviewer_comments }}</td>
                                <td>
                                    <form action="{{ route('admin.reviews.destroy',$review->id) }}" method="Post">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="btn btn bg-danger text-white">Delete</button>
                                        </form>
                                    </td>
                                    <td>
                                        <form action="{{ route('admin.reviews.toggleStatus', $review->id) }}" method="POST" class="d-inline">
                                            @method('PUT')
                                            @csrf
                                            <button type="submit" class="btn btn bg-{{ $review->status ? 'danger' : 'success' }} text-white">
                                                {{ $review->status ? 'Nonaktifkan' : 'Aktifkan' }}
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






