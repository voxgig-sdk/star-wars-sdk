<?php
declare(strict_types=1);

// StarWars SDK utility registration

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

StarWarsUtility::setRegistrar(function (StarWarsUtility $u): void {
    $u->clean = [StarWarsClean::class, 'call'];
    $u->done = [StarWarsDone::class, 'call'];
    $u->make_error = [StarWarsMakeError::class, 'call'];
    $u->feature_add = [StarWarsFeatureAdd::class, 'call'];
    $u->feature_hook = [StarWarsFeatureHook::class, 'call'];
    $u->feature_init = [StarWarsFeatureInit::class, 'call'];
    $u->fetcher = [StarWarsFetcher::class, 'call'];
    $u->make_fetch_def = [StarWarsMakeFetchDef::class, 'call'];
    $u->make_context = [StarWarsMakeContext::class, 'call'];
    $u->make_options = [StarWarsMakeOptions::class, 'call'];
    $u->make_request = [StarWarsMakeRequest::class, 'call'];
    $u->make_response = [StarWarsMakeResponse::class, 'call'];
    $u->make_result = [StarWarsMakeResult::class, 'call'];
    $u->make_point = [StarWarsMakePoint::class, 'call'];
    $u->make_spec = [StarWarsMakeSpec::class, 'call'];
    $u->make_url = [StarWarsMakeUrl::class, 'call'];
    $u->param = [StarWarsParam::class, 'call'];
    $u->prepare_auth = [StarWarsPrepareAuth::class, 'call'];
    $u->prepare_body = [StarWarsPrepareBody::class, 'call'];
    $u->prepare_headers = [StarWarsPrepareHeaders::class, 'call'];
    $u->prepare_method = [StarWarsPrepareMethod::class, 'call'];
    $u->prepare_params = [StarWarsPrepareParams::class, 'call'];
    $u->prepare_path = [StarWarsPreparePath::class, 'call'];
    $u->prepare_query = [StarWarsPrepareQuery::class, 'call'];
    $u->result_basic = [StarWarsResultBasic::class, 'call'];
    $u->result_body = [StarWarsResultBody::class, 'call'];
    $u->result_headers = [StarWarsResultHeaders::class, 'call'];
    $u->transform_request = [StarWarsTransformRequest::class, 'call'];
    $u->transform_response = [StarWarsTransformResponse::class, 'call'];
});
