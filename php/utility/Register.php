<?php
declare(strict_types=1);

// GithubRest SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GithubRestUtility::setRegistrar(function (GithubRestUtility $u): void {
    $u->clean = [GithubRestClean::class, 'call'];
    $u->done = [GithubRestDone::class, 'call'];
    $u->make_error = [GithubRestMakeError::class, 'call'];
    $u->feature_add = [GithubRestFeatureAdd::class, 'call'];
    $u->feature_hook = [GithubRestFeatureHook::class, 'call'];
    $u->feature_init = [GithubRestFeatureInit::class, 'call'];
    $u->fetcher = [GithubRestFetcher::class, 'call'];
    $u->make_fetch_def = [GithubRestMakeFetchDef::class, 'call'];
    $u->make_context = [GithubRestMakeContext::class, 'call'];
    $u->make_options = [GithubRestMakeOptions::class, 'call'];
    $u->make_request = [GithubRestMakeRequest::class, 'call'];
    $u->make_response = [GithubRestMakeResponse::class, 'call'];
    $u->make_result = [GithubRestMakeResult::class, 'call'];
    $u->make_point = [GithubRestMakePoint::class, 'call'];
    $u->make_spec = [GithubRestMakeSpec::class, 'call'];
    $u->make_url = [GithubRestMakeUrl::class, 'call'];
    $u->param = [GithubRestParam::class, 'call'];
    $u->prepare_auth = [GithubRestPrepareAuth::class, 'call'];
    $u->prepare_body = [GithubRestPrepareBody::class, 'call'];
    $u->prepare_headers = [GithubRestPrepareHeaders::class, 'call'];
    $u->prepare_method = [GithubRestPrepareMethod::class, 'call'];
    $u->prepare_params = [GithubRestPrepareParams::class, 'call'];
    $u->prepare_path = [GithubRestPreparePath::class, 'call'];
    $u->prepare_query = [GithubRestPrepareQuery::class, 'call'];
    $u->result_basic = [GithubRestResultBasic::class, 'call'];
    $u->result_body = [GithubRestResultBody::class, 'call'];
    $u->result_headers = [GithubRestResultHeaders::class, 'call'];
    $u->transform_request = [GithubRestTransformRequest::class, 'call'];
    $u->transform_response = [GithubRestTransformResponse::class, 'call'];
});
