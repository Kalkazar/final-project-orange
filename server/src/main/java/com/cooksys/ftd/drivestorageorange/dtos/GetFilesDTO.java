package com.cooksys.ftd.drivestorageorange.dtos;

public class GetFilesDTO {

	private String sortBy;
	
	private Long page;
	
	private Long limit;

	public GetFilesDTO() {
		this.sortBy = "filename";
		this.page = new Long(1);
		this.limit = new Long(100);
	}

	public String getSortBy() {
		return sortBy;
	}

	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}

	public Long getPage() {
		return page;
	}

	public void setPage(Long page) {
		this.page = page;
	}

	public Long getLimit() {
		return limit;
	}

	public void setLimit(Long limit) {
		this.limit = limit;
	}
}
